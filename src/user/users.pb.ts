/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "users";

export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
}

export interface User {
  username: string;
  password: string;
  email: string;
}

export interface UserList {
  users: User[];
}

export interface FindUserRequest {
  id: string;
}

export interface DeleteUserRequest {
  id: string;
}

export interface DeleteUserResponse {
  success: boolean;
}

export interface Empty {
}

export const USERS_PACKAGE_NAME = "users";

export interface UserServiceClient {
  findAll(request: Empty): Observable<UserList>;

  createUser(request: CreateUserDto): Observable<User>;

  findById(request: FindUserRequest): Observable<User>;

  deleteById(request: DeleteUserRequest): Observable<DeleteUserResponse>;
}

export interface UserServiceController {
  findAll(request: Empty): Promise<UserList> | Observable<UserList> | UserList;

  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findById(request: FindUserRequest): Promise<User> | Observable<User> | User;

  deleteById(
    request: DeleteUserRequest,
  ): Promise<DeleteUserResponse> | Observable<DeleteUserResponse> | DeleteUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAll", "createUser", "findById", "deleteById"];
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
