import {
  Component,
  createSignal,
  For,
  onMount,
  createRenderEffect,
  Accessor,
  createEffect,
} from 'solid-js';
import {
  createAutoAnimate,
  createAutoAnimateDirective,
} from './autoAnimateSolid';
import { HiSolidX } from 'solid-icons/hi';
interface Fruit {
  name: string;
}

const items: Array<Fruit> = [
  { name: '🍎 Apple' },
  { name: '🍌 Banana' },
  { name: '🍒 Cherry' },
];

const fruitBasket = [
  '🍓 Strawberry',
  '🥥 Coconut',
  '🥝 Kiwi',
  '🍇 Grape',
  '🍉 Watermelon',
  '🍍 Pineapple',
  '🍐 Pear',
  '🍑 Peach',
  '🫐 Blueberry',
  '🍊 Orange',
  '🥭 Mango',
];

const [fruits, setFruits] = createSignal<Fruit[]>(items);

const add = () => {
  if (fruitBasket.length) {
    setFruits((old) => {
      const copy = [...old];
      copy.splice(Math.round(Math.random() * copy.length - 1), 0, {
        name: fruitBasket.shift()!,
      });
      return copy;
    });
  } else {
    alert('Out of fruit!');
  }
};

const remove = (fruit: Fruit) => {
  setFruits((old) => {
    return old.filter((f) => f !== fruit);
  });
};

const randomize = () =>
  setFruits((old) => [...old.sort(() => (Math.random() > 0.5 ? 1 : -1))]);

const App: Component = () => {
  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-6">SolidJS Auto Animate Examples</h1>

      <div class="flex gap-4">
        <ListWithDirective />
        <ListWithPrimitive />
      </div>
    </div>
  );
};

const ListWithDirective = () => {
  const autoAnimate = createAutoAnimateDirective();
  return (
    <div class="bg-gray-50 max-w-sm border p-4 rounded-md shadow-md">
      <h2 class="text-lg font-semibold">
        List Example{' '}
        <span class="text-gray-600 text-sm font-normal">(with directive)</span>
      </h2>

      <div class="mt-6">
        <ul use:autoAnimate class="mb-6 max-w-[300px] overflow-hidden">
          <For each={fruits()}>
            {(fruit) => (
              <li class="flex border items-center mb-2 py-2.5 px-3 rounded">
                <span class="flex-1 font-semibold text-sm">{fruit.name}</span>
                <button onClick={() => remove(fruit)} aria-label="Remove Fruit">
                  <HiSolidX size={20} class="text-red-500" />
                </button>
              </li>
            )}
          </For>
        </ul>

        <div class="flex gap-3">
          <button
            onClick={add}
            class="border-2 border-gray-500 hover:border-gray-700 rounded-md text-sm text-gray-600 py-1.5 px-5"
          >
            + Add Fruit
          </button>
          <button
            onClick={randomize}
            class="border-2 border-gray-500 hover:border-gray-700 rounded-md text-sm text-gray-600 py-1.5 px-5"
          >
            Randomize
          </button>
        </div>
      </div>
    </div>
  );
};

const ListWithPrimitive = () => {
  const [animationEnabled, setAnimationEnabled] = createSignal(true);
  const [parentRef, setEnabled] = createAutoAnimate();

  createEffect(() => {
    setEnabled(animationEnabled());
  });

  return (
    <div class="bg-gray-50 max-w-sm border p-4 rounded-md shadow-md">
      <h2 class="text-lg font-semibold">
        List Example{' '}
        <span class="text-gray-600 text-sm font-normal">(with primitive)</span>
      </h2>
      <div class="mt-6">
        <ul ref={parentRef} class="mb-6 max-w-[300px] overflow-hidden">
          <For each={fruits()}>
            {(fruit) => (
              <li class="flex border items-center mb-2 py-2.5 px-3 rounded">
                <span class="flex-1 font-semibold text-sm">{fruit.name}</span>
                <button onClick={() => remove(fruit)} aria-label="Remove Fruit">
                  <HiSolidX size={20} class="text-red-500" />
                </button>
              </li>
            )}
          </For>
        </ul>

        <div class="flex gap-3">
          <button
            onClick={add}
            class="border-2 border-gray-500 hover:border-gray-700 rounded-md text-sm text-gray-600 py-1.5 px-5"
          >
            + Add Fruit
          </button>
          <button
            onClick={randomize}
            class="border-2 border-gray-500 hover:border-gray-700 rounded-md text-sm text-gray-600 py-1.5 px-5"
          >
            Randomize
          </button>
        </div>
        <div class="mt-4">
          <button
            onClick={() => setAnimationEnabled((v) => !v)}
            class={`border-2 rounded-md text-sm py-1.5 px-5 ${
              animationEnabled()
                ? 'border-red-500 hover:border-red-700 text-red-600'
                : 'border-green-500 hover:border-green-700 text-green-600'
            }`}
          >
            {animationEnabled() ? 'Stop Animation' : 'Start Animation'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
