import { useAppStore } from "./store";
import socket from "./rpc/manager";
import { useEffect } from "react";

function App() {
  const { users } = useAppStore();

  useEffect(() => {
    socket.init();
  }, []);

  return (
    <div className="container">
      <div data-tauri-drag-region className="cursor-default select-none p-2 bg-black text-white">
        overlayed
      </div>
      <div className="py-2">
        {Object.entries(users).map(([_k, item]) => (
          <div className="flex items-center">
            <div
              className="rounded-full bg-black w-8 h-8 border-2 border-slate-800 mr-2"
              style={{
                borderColor: item.talking ? "limegreen" : "inherit",
              }}
            />

            <div className="text-white">{item.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
