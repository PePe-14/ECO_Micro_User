/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "users";

export interface Empty {
}

export interface Error {
  message: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
}

export interface CreateUserResponse {
  user: User | undefined;
  error: Error | undefined;
}

export interface GetAllUsersResponse {
  users: User[];
  error: Error | undefined;
}

export interface FindOneUserRequest {
  id: string;
}

export interface FindOneUserResponse {
  user: User | undefined;
  error: Error | undefined;
}

export interface DeleteUserRequest {
  id: string;
}

export interface DeleteUserResponse {
  isDeleted: boolean;
  error: Error | undefined;
}

export const USERS_PACKAGE_NAME = "users";

export interface UserServiceClient {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;

  getAllUsers(request: Empty): Observable<GetAllUsersResponse>;

  findOneUser(request: FindOneUserRequest): Observable<FindOneUserResponse>;

  deleteUser(request: DeleteUserRequest): Observable<DeleteUserResponse>;
}

export interface UserServiceController {
  createUser(
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  getAllUsers(request: Empty): Promise<GetAllUsersResponse> | Observable<GetAllUsersResponse> | GetAllUsersResponse;

  findOneUser(
    request: FindOneUserRequest,
  ): Promise<FindOneUserResponse> | Observable<FindOneUserResponse> | FindOneUserResponse;

  deleteUser(
    request: DeleteUserRequest,
  ): Promise<DeleteUserResponse> | Observable<DeleteUserResponse> | DeleteUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "getAllUsers", "findOneUser", "deleteUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
