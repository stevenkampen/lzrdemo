export type Transform<InputType, ReturnType> = (input: InputType) => ReturnType;

export type Request<Parameters> = (params: Parameters) => Promise<any>;

export type Service<Parameters, ReturnType> = (params: Parameters) => Promise<ReturnType>;

export type ServiceFactory = <Parameters, ResponseType, ResultType>(
  request: Request<Parameters>,
  transform: Transform<ResponseType, ResultType>,
) => Service<Parameters, ResultType>;
