import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type SortType = 'name' | 'length' | '' ;

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {

  const [sortBy, setSortBy] = useState<SortType>('');
  const [goods] = useState<string[]>(goodsFromServer);

  const [reversed, setReversed] = useState<boolean>(false);
  const [selectedGoods, setSelectedGoods] = useState<string[]>([]);

  const isDefaultOrder = sortBy === '' && reversed === false;

  const handleSetSort = (field: SortType) => {
    setReversed(false);
    setSortBy(field);
  };

  const handleReverseSort = () => {
    setReversed(current => !current);
  };

  const handleResetSort = () => {
    setSortBy('');
    setReversed(false);
  };

  const handleSelectGoods = (good: string) => {
    setSelectedGoods((currentSelectedGoods: string[]) => {
      if (currentSelectedGoods.includes(good)) {
        return currentSelectedGoods.filter(item => item !== good);
      }

      return [...currentSelectedGoods, good];
    });
  };

  const visibleGoods: string[] = [...goods];

  if (sortBy === 'name') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length || a.localeCompare(b));
  }

  if (reversed) {
    visibleGoods.reverse();
  }

 return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === 'name' ? '' : 'is-light'}`}
          onClick={() => handleSetSort('name')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortBy === 'length' ? '' : 'is-light'}`}
          onClick={() => handleSetSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={handleReverseSort}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            <button
              type="button"
              className={`button is-small ${
                selectedGoods.includes(good) ? 'is-success' : 'is-light'
              }`}
              onClick={() => handleSelectGoods(good)}
            >
              {good}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
