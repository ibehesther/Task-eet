interface ValidationError extends Error {
    message: string;
    details: ValidationErrorItem[];
    _object: any;
    annotate(stripColorCodes?: boolean): string;
}

export interface IError{
    type: string;
    message?: string;
    e_message?: string;
    details?: [];
}