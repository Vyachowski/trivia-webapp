'use client';

import styles from './ProgressList.module.scss';
import classNames from 'classnames/bind';
import { HIGHLIGHTED_STEPS, PROGRESS_LADDER } from '@/config';
import { useAppSelector } from '@/store';

const cx = classNames.bind(styles);

export const ProgressList = () => {
  const currentRoundIndex = useAppSelector((state) => state.round.count);

  return (
    <ul className={cx('progress-list')}>
      {PROGRESS_LADDER.map((step, index) => (
        <li
          className={cx([
            'progress-item',
            { 'progress-item--active': index === currentRoundIndex },
          ])}
          key={step}
        >
          <span className={cx('progress-number')}>{index + 1}</span>
          <span
            className={cx([
              'progress-text',
              {
                'progress-text--highlighted': HIGHLIGHTED_STEPS.includes(index),
              },
            ])}
          >
            {step}
          </span>
        </li>
      ))}
    </ul>
  );
};
