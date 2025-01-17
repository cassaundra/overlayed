import { useEffect } from "react";
import { register, isRegistered, unregister } from "@tauri-apps/api/globalShortcut";
import { useAppStore } from "@/store";
import { invoke } from "@tauri-apps/api";

// TODO: make these configurable?
const HIDE_TOGGLE_KEYBIND = "Command+Shift+G";
const TOGGLE_CLICKTHROUGH_KEYBIND = "Command+Shift+H";

export const useKeybinds = () => {
  const { setAppVisible, visible } = useAppStore();

  useEffect(() => {
    const registerKeybind = async () => {
      if (await isRegistered(HIDE_TOGGLE_KEYBIND)) {
        await unregister(HIDE_TOGGLE_KEYBIND);
      }

      await register(HIDE_TOGGLE_KEYBIND, () => {
        const newVisible = !visible;

        // invert the current visibility
        setAppVisible(newVisible);
      });
    };

    registerKeybind();
  }, [visible]);

  useEffect(() => {
    const registerKeybind = async () => {
      if (await isRegistered(TOGGLE_CLICKTHROUGH_KEYBIND)) {
        await unregister(TOGGLE_CLICKTHROUGH_KEYBIND);
      }

      await register(TOGGLE_CLICKTHROUGH_KEYBIND, () => {
        invoke("toggle_clickthrough");
      });
    };

    registerKeybind();
  }, []);
};
