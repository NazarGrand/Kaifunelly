class ValidationError extends Error {
  public statusCode: number;
  public description?: string;
  public code?: string;

  constructor(
    message: string,
    statusCode: number,
    description?: string,
    code?: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.description = description;
    this.code = code;

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export default ValidationError;
