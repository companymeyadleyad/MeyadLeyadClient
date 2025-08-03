import { makeAutoObservable } from "mobx";
import { User } from "types/User/User";

class UserStore {
  user: User | null = null;
  isLoggedIn = false;
  token: string | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = user;
    this.isLoggedIn = true;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("authToken", token);
  }
  isTokenExists(): boolean {
    const token = localStorage.getItem("authToken");
    return token !== null && token !== "";
  }
  clearUser() {
    this.user = null;
    this.token = null;
    this.isLoggedIn = false;
    localStorage.removeItem("authToken");
  }
}

export const userStore = new UserStore();
