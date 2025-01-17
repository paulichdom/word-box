import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
  ToggleCustomEvent,
} from "@ionic/react";
import "./Tab3.css";
import { useEffect, useState } from "react";

const Tab3: React.FC = () => {
  const [paletteToggle, setPaletteToggle] = useState(false);

  // Listen for the toggle check/uncheck to toggle the dark palette
  const toggleChange = (event: ToggleCustomEvent) => {
    toggleDarkPalette(event.detail.checked);
  };

  // Add or remove the "ion-palette-dark" class on the html element
  const toggleDarkPalette = (shouldAdd: boolean) => {
    document.documentElement.classList.toggle("ion-palette-dark", shouldAdd);
  };

  // Check/uncheck the toggle and update the palette based on isDark
  const initializeDarkPalette = (isDark: boolean) => {
    setPaletteToggle(isDark);
    toggleDarkPalette(isDark);
  };

  useEffect(() => {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkPalette(prefersDark.matches);

    const setDarkPaletteFromMediaQuery = (mediaQuery: MediaQueryListEvent) => {
      initializeDarkPalette(mediaQuery.matches);
    };

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener("change", setDarkPaletteFromMediaQuery);

    return () => {
      prefersDark.removeEventListener("change", setDarkPaletteFromMediaQuery);
    };
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonListHeader>Appearance</IonListHeader>
        <IonList inset={true}>
          <IonItem>
            <IonToggle
              checked={paletteToggle}
              onIonChange={toggleChange}
              justify="space-between"
            >
              Dark Mode
            </IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
