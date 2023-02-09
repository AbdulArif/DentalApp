import { ApplicationRef, Injectable } from '@angular/core';
import { dark, light, Theme } from './theme';

@Injectable({
  providedIn: 'root'
})
export class SystemThemeService {
  private active: Theme = light;
  public availableThemes: Theme[] = [light, dark];

  constructor(
    private ref: ApplicationRef
  ) { }

  setDarkTheme(): void {
    const darkModeOn = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (darkModeOn) {
      this.setActiveTheme(this.availableThemes.find(t => t.name === "dark")!);
    }
    window.matchMedia("(prefers-color-scheme: dark)").addListener(e => {
      const turnOn = e.matches;
      this.setActiveTheme(this.availableThemes.find(t => t.name === (turnOn ? "dark" : "light"))!);
      this.ref.tick();
    });
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;
    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

}
