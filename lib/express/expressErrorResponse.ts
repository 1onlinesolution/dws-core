export interface ErrorItem {
  message: string;
  field?: string;
}

export interface ExpressErrorResponse {
  errors: ErrorItem[];
  statusCode: number;
}
