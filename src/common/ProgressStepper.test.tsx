import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProgressStepper from './ProgressStepper';

describe('ProgressStepper', () => {
  const steps = ['step 1', 'step 2'];

  beforeEach(() => {
    render(
      <ProgressStepper steps={steps}>
        <p>This is content</p>
      </ProgressStepper>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('displays the steps, buttons and children', () => {
    expect(screen.queryByText('step 1')).toBeTruthy();
    expect(screen.queryByText('step 2')).toBeTruthy();

    expect(screen.queryByText('Back')).toBeTruthy();
    expect(screen.queryByText('Next')).toBeTruthy();

    expect(screen.queryByText('This is content')).toBeTruthy();
  });

  it('can go to the next step', () => {
    const nextText = screen.queryByText('Next');
    if (nextText) {
      const nextButton = nextText.closest('button') as HTMLButtonElement;
      userEvent.click(nextButton);
    }

    const completedStatusIcon = screen.queryAllByTestId('CheckCircleIcon');
    expect(completedStatusIcon.length).toBe(1);
  });

  it('can go to the previous step', () => {
    const nextText = screen.queryByText('Next');
    const backText = screen.queryByText('Back');
    if (nextText && backText) {
      const nextButton = nextText.closest('button') as HTMLButtonElement;
      const backButton = backText.closest('button') as HTMLButtonElement;
      userEvent.click(nextButton);
      userEvent.click(backButton);
    }

    const completedStatusIcon = screen.queryByTestId('CheckCircleIcon');
    expect(completedStatusIcon).toBeFalsy();
  });

  it('can finish and reset process', () => {
    const nextText = screen.queryByText('Next');
    if (nextText) {
      const nextButton = nextText.closest('button') as HTMLButtonElement;
      userEvent.click(nextButton);
      expect(screen.queryAllByTestId('CheckCircleIcon').length).toBe(1);

      userEvent.click(nextButton);
      expect(screen.queryAllByTestId('CheckCircleIcon').length).toBe(2);
    }

    const finishText = screen.queryByText('Finish');
    if (finishText) {
      const finishButton = finishText.closest('button') as HTMLButtonElement;
      userEvent.click(finishButton);
    }

    expect(screen.queryByText("All steps completed - you're finished")).toBeTruthy();

    const resetText = screen.queryByText('Reset');
    if (resetText) {
      const resetButton = resetText.closest('button') as HTMLButtonElement;
      userEvent.click(resetButton);
    }
    expect(screen.queryAllByTestId('CheckCircleIcon').length).toBe(0);
  });
});
