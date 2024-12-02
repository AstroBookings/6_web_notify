import { computed, Signal, signal, WritableSignal } from "@angular/core";

/**
 * Base interface for actions
 */
export interface Action {
  type: string;
  payload?: any;
}

/**
 * Generic Store with typed state and actions
 * @template T - Type of the state
 * @template A - Type of the actions (must extend Action)
 */
export class Store<T, A extends Action = Action> {
  /**
   * Internal state, accessed only by the store
   */
  private state: WritableSignal<T>;


  /**
   * Reducer function to update the state
   */
  private reducer?: (state: T, action: A) => T;

  /**
   * Creates a new store with the given initial state and optional reducer function
   * - If no reducer is provided, the state will be updated by the action payload directly.
   * @param initialState - Initial state of the store
   * @param reducer - Optional reducer function to update the state
   */
  constructor(initialState: T, reducer?: (state: T, action: A) => T) {
    this.state = signal<T>(this.clone(initialState));
    this.reducer = reducer;
  }

  /**
   * Dispatches an action to update the state.  
   * - The reducer function will be used to update the state if provided.
   * - Otherwise, the state will be updated by the action payload directly.
   * @param action - Action to dispatch
   */
  public dispatch(action: A): void {
    if (this.reducer) {
      this.state.update((state) => this.reducer!(state, action));
    } else {
      this.state.set(this.clone(action.payload));
    } 
  }

  /**
   * Select a portion (or computed projection) of the state as an observable.
   * - The provided function determines the portion (or projection) of the state to observe.
   * - The output signal emits only when the selected portion changes.
   * @param selectorFn - Function to select part or computed projection of the state
   * @returns Signal of the selected state
   */
  public select<R>(selectorFn: (state: T) => R): Signal<R> {
    return computed(() => selectorFn(this.state()));
  }

  /**
   * Add an effect to react to changes in the state.
   * - Effects are functions that run whenever the selected part of the state changes.
   * @param selectorFn - Function to select the part of the state to observe
   * @param effectFn - Function to execute when the selected part changes
   */
  public addEffect<R>(selectorFn: (state: T) => R, effectFn: (value: R) => void): void {

  }

  /**
   * Get the current state value (synchronously).
   * - ensures immutability by cloning the state
   * @returns The current state
   */
  public getState(): T {
    return this.clone(this.state());
  }

  /**
   * Clone the state to ensure immutability.
   * - Use structured cloning for deep copies.
   * @param state - The state to clone
   * @returns A new copy of the state
   */
  private clone(state: T): T {
    return JSON.parse(JSON.stringify(state));
  }

  /**
   * Clean up all effects and subscriptions.
   * - must be called when the store is destroyed
   */
  public destroy(): void {
    // this.effects.forEach((effect) => effect.unsubscribe());
    // this.effects = [];
  }
}
