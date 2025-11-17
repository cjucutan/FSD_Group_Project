import type { BaseResponse } from "../../components/common/types/BaseResponse";
import type { User } from "../../components/common/types/users";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export async function getUsers(){
    const response: Response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const json: BaseResponse<User[]> = await response.json();
  return json.data;
}

export async function getUserById(userId: string): Promise<User>{
    const response: Response = await fetch(`${BASE_URL}/users/${userId}`, {
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user with id: ${userId}`);
  }

  const json: BaseResponse<User> = await response.json();
  return json.data;
}

export async function createUser(user: User){
    const response: Response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify({ ...user }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to create user`);
  }

  const json: BaseResponse<User> = await response.json();
  return json.data;
}

export async function updateUser(user: User){
    const response: Response = await fetch(`${BASE_URL}/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify({ ...user }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to update user with id: ${user.id}`);
  }

  const json: BaseResponse<User> = await response.json();
  return json.data;
}

export async function deleteUser(userId: string): Promise<void>{
    const response: Response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user with id ${userId}`);
  }
}