import ErrorCodes from './ErrorCodes';

export default interface IExpressError extends Error {
    status: ErrorCodes
}