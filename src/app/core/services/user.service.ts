import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:8000/usuarios/";
  private user$: BehaviorSubject<User | null>;
  private user: User | null = null;

  constructor() {
    this.user$ = new BehaviorSubject<User | null>(this.loadUserFromStorage());
  }

  private loadUserFromStorage(): User | null {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUserObservable(): Observable<User | null> {
    return this.user$.asObservable();
  }

  getUser(): User | null {
    return this.user;
  }

  setUser(user: User): void {
    if (user != this.user) {
      this.user = user;
      this.saveUserToStorage(user);
      this.user$.next(user);
    }
  }
}
