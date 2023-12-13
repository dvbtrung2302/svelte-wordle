import { writable, derived, type Writable, type Readable } from "svelte/store";
import type { Notification } from "../lib/types";

function createNotificationStore() {
  const _notifications: Writable<Notification[]> = writable([]);

  function send(message: string, timeout: number) {
    _notifications.update((state) => {
      return [...state, { id: id(), message, timeout }];
    });
  }

  const notifications: Readable<Notification[]> = derived(
    _notifications,
    ($_notifications, set) => {
      set($_notifications);
      if ($_notifications.length > 0) {
        const timer = setTimeout(() => {
          _notifications.update((state) => {
            state.shift();
            return state;
          });
        }, $_notifications[0].timeout);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  );
  const { subscribe } = notifications;

  return {
    subscribe,
    send,
    default: (msg: string, timeout: number) => send(msg, timeout),
  };
}

function id(): string {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export const notifications = createNotificationStore();
