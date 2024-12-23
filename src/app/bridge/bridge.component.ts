import { Component, effect } from "@angular/core";
import { Router } from "@angular/router";
import { AuthGoogleService } from "../guards/auth-google.service";
import { User } from "../core/models/user.model";
import { UserService } from "../core/services/user.service";

@Component({
  selector: "app-bridge",
  imports: [],
  templateUrl: "./bridge.component.html",
})
export class BridgeComponent {
  profile: any;
  constructor(
    private authService: AuthGoogleService,
    private router: Router,
    private userService: UserService,
  ) {
    this.profile = this.authService.profile;
    effect(() => {
      if (this.profile) {
        console.log("Profile: ", this.profile());
        console.log("auth: ", this.authService.getRawProfile());
        const { name, email, sub, picture } = this.profile();
        let user: User;
        user = {
          id: sub,
          name: name,
          email: email,
          role: "lector",
          profilePicture: picture,
          wantsEmailNotifications: true,
          oauth: {
            access_token: this.authService.getToken(),
            expires_in: this.authService.getExpiresIn(),
            refresh_token: this.authService.getRefreshToken(),
            expires_in_refresh: this.authService.getExpiresInRefresh(),
          },
        };
        this.userService.setUser(user);
        console.log("Usuario: ", this.userService.getUser());
        this.router.navigate(["/"]);
      }
    });
  }
}
