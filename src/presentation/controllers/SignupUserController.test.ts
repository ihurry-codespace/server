import {
  InvalidParameterError,
  MissingParameterError,
  ServerError,
} from "@presentation/errors";
import { HttpRequest } from "@presentation/interfaces/http";
import { SignupUserController, Params } from "./SignupUserController";

class SignupTestBuilder {
  private addUserServiceStub: any;
  private emailValidatorStub: any;
  private httpRequestMock: HttpRequest<Params>;

  constructor() {
    class EmailValidator {
      validate() {
        return true;
      }
    }

    class AddUserService {
      async add(user: any) {
        return Promise.resolve(user);
      }
    }

    this.emailValidatorStub = new EmailValidator();
    this.addUserServiceStub = new AddUserService();
    this.httpRequestMock = {
      body: {
        avatar: "http://",
        email: "test@example.com",
        password: "password",
        name: "any name",
      },
    };
  }

  static init(): SignupTestBuilder {
    return new SignupTestBuilder();
  }

  removeParam(value: keyof Params): SignupTestBuilder {
    delete this.httpRequestMock.body[value];

    return this;
  }

  whenEmailIsInvalid(): SignupTestBuilder {
    class EmailValidator {
      validate() {
        return false;
      }
    }
    this.emailValidatorStub = new EmailValidator();

    return this;
  }

  whenEmailValidatorThrows(): SignupTestBuilder {
    class EmailValidator {
      validate() {
        throw new Error("any error");
      }
    }
    this.emailValidatorStub = new EmailValidator();

    return this;
  }

  async build() {
    return await new SignupUserController(
      this.addUserServiceStub,
      this.emailValidatorStub
    ).handle(this.httpRequestMock);
  }
}

test("should return 400 if name is not provided", async () => {
  const result = await SignupTestBuilder.init().removeParam("name").build();

  expect(result.statusCode).toBe(400);
  expect(result.body).toEqual(new MissingParameterError("name"));
});

test("should return 400 if password is not provided", async () => {
  const result = await SignupTestBuilder.init().removeParam("password").build();

  expect(result.statusCode).toBe(400);
  expect(result.body).toEqual(new MissingParameterError("password"));
});

test("should return 400 if email is not provided", async () => {
  const result = await SignupTestBuilder.init().removeParam("email").build();

  expect(result.statusCode).toBe(400);
  expect(result.body).toEqual(new MissingParameterError("email"));
});

test("should return 400 if avatar is not provided", async () => {
  const result = await SignupTestBuilder.init().removeParam("avatar").build();

  expect(result.statusCode).toBe(400);
  expect(result.body).toEqual(new MissingParameterError("avatar"));
});

test("should return 400 when email is invalid", async () => {
  const result = await SignupTestBuilder.init().whenEmailIsInvalid().build();

  expect(result.statusCode).toBe(400);
  expect(result.body).toEqual(new InvalidParameterError("email"));
});

test("should return 500 when email throw any error", async () => {
  const result = await SignupTestBuilder.init()
    .whenEmailValidatorThrows()
    .build();

  expect(result.statusCode).toBe(500);
  expect(result.body).toEqual(new ServerError());
});

test("should return success when signu a user", async () => {
  const result = await SignupTestBuilder.init().build();

  expect(result.statusCode).toBe(200);
  expect(result.body).toMatchInlineSnapshot(`
    Object {
      "avatar": "http://",
      "email": "test@example.com",
      "name": "any name",
      "password": "password",
    }
  `);
});
