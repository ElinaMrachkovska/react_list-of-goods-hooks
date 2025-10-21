import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum SortType {
  Name = 'name',
  Length = 'length',
  Default = '',
}

export const goodsFromServer = [
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

function getSortedGoods(goods: string[], sortBy: SortType, isReversed: boolean) {
  const visibleGoods: string[] = [...goods];

  if (sortBy === 'name') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length || a.localeCompare(b));
  }

  if (isReversed) {
    visibleGoods.reverse();
  }
  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);

  const [isReversed, setIsReversed] = useState(false);
  const [selectedGoods, setSelectedGoods] = useState<string[]>([]);

  const isDefaultOrder = sortBy === '' && isReversed === false;

  const handleSetSort = (field: SortType) => {
    setSortBy(field);
  };

  const handleReverseSort = () => {
    setIsReversed(current => !current);
  };

  const handleResetSort = () => {
    setSortBy(SortType.Default);
    setIsReversed(false);
  };

  const handleSelectGoods = (good: string) => {
    setSelectedGoods((currentSelectedGoods: string[]) => {
      if (currentSelectedGoods.includes(good)) {
        return currentSelectedGoods.filter(item => item !== good);
      }

      return [...currentSelectedGoods, good];
    });
  
  };

  const visibleGoods = getSortedGoods(goodsFromServer, sortBy,isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === 'name' ? '' : 'is-light'}`}
          onClick={() => handleSetSort(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortBy === 'length' ? '' : 'is-light'}`}
          onClick={() => handleSetSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          // className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          className={classNames('button', {'is-warning' : isReversed, 'is-light' : !isReversed})}


          onClick={handleReverseSort}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            className={classNames('button is-danger', 'is-light')}
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
              className={classNames('button is-small', {'is-success' : selectedGoods.includes(good), 'is-light' : !selectedGoods.includes(good) })}
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
