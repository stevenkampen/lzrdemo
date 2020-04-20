export type Action<Type, Meta = void> = {
  readonly type: Type;
  readonly meta?: Meta;
};

export type PayloadAction<Type, Payload, Meta = void> = Action<Type, Meta> & {
  readonly payload: Payload;
};
