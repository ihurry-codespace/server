/**
 * Enum user roles
 * @readonly
 * @enum {string}
 */
export enum BusinessOwnerRole {
  /**
   * This user can create and update the company's profile to accept new analysts, register interview flows, vacancies and enrolling candidate for vacancy, approving and reproving candidate sending a message to candidate.
   */
  ADMIN = 'admin',
  /**
   * Registering interview flows, vacancies and enrolling candidate for vacancy, approve and reprove candidate Send a message to candidate.
   */
  ANALYST = 'analyst',
}

/**
 * Enum user statuses
 * @readonly
 * @enum {string}
 */
export enum UserStatus {
  /** The default status for new records. To log in, a user record must be active. */
  ACTIVE = 'active',

  /** Users cannot log in. Inactive user records do not appear in select value lists and cannot be associated with new records. */
  INACTIVE = 'inactive',

  /** Users cannot log in. */
  BLOCKED = 'blocked',

  /** The user was deleted but the user name has been retained. */
  DELETED = 'deleted',

  /** The default status for user records that are created using self-registration. */
  NEWREG = 'newreg',
}

/**
 * Enum user roles
 * @readonly
 * @enum {string}
 */
export enum UserRole {
  /**
   * This user can create and update the company's profile to accept new analysts, register interview flows, vacancies and enrolling candidate for vacancy, approving and reproving candidate sending a message to candidate.
   */
  ADMIN = 'admin',

  /**
   * Can update information from users, register new templates.
   */
  SYSTEM_ADMIN = 'system_admin',
  /**
   * Registering interview flows, vacancies and enrolling candidate for vacancy, approve and reprove candidate Send a message to candidate.
   */
  ANALYST = 'analyst',

  /** Can visualize flows that are participating or participating can send a message to the analyst within the interview stream. */
  CANDIDATE = 'candidate',
}
