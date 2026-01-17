document.addEventListener('DOMContentLoaded', () => {
  const animationDuration = 300;
  const animationEasing = 'ease';

  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach((item) => {
    const summary = item.querySelector('.faq__summary');
    const answer = item.querySelector('.faq__answer');

    if (!summary || !answer) {
      return;
    }

    item.classList.toggle('is-open', item.open);

    const computedStyle = window.getComputedStyle(answer);
    const originalPaddingTop = computedStyle.paddingTop;
    const originalPaddingBottom = computedStyle.paddingBottom;
    const originalBorderTopWidth = computedStyle.borderTopWidth;
    let isAnimating = false;

    const openAnswer = () => {
      if (isAnimating || item.open) {
        return;
      }

      isAnimating = true;
      item.open = true;
      item.classList.add('is-open');

      answer.style.transition = '';
      answer.style.height = 'auto';
      answer.style.paddingTop = originalPaddingTop;
      answer.style.paddingBottom = originalPaddingBottom;
      answer.style.borderTopWidth = originalBorderTopWidth;

      const targetHeight = answer.scrollHeight;

      answer.style.height = '0px';
      answer.style.paddingTop = '0px';
      answer.style.paddingBottom = '0px';
      answer.style.borderTopWidth = '0px';

      answer.getBoundingClientRect();
      answer.style.transition = [
        `height ${animationDuration}ms ${animationEasing}`,
        `padding ${animationDuration}ms ${animationEasing}`,
        `border-top-width ${animationDuration}ms ${animationEasing}`,
      ].join(', ');

      answer.style.height = `${targetHeight}px`;
      answer.style.paddingTop = originalPaddingTop;
      answer.style.paddingBottom = originalPaddingBottom;
      answer.style.borderTopWidth = originalBorderTopWidth;

      window.setTimeout(() => {
        answer.style.height = '';
        answer.style.paddingTop = '';
        answer.style.paddingBottom = '';
        answer.style.borderTopWidth = '';
        answer.style.transition = '';
        isAnimating = false;
      }, animationDuration);
    };

    const closeAnswer = () => {
      if (isAnimating || !item.open) {
        return;
      }

      isAnimating = true;
      item.classList.remove('is-open');

      answer.style.transition = '';
      answer.style.height = 'auto';
      answer.style.paddingTop = originalPaddingTop;
      answer.style.paddingBottom = originalPaddingBottom;
      answer.style.borderTopWidth = originalBorderTopWidth;

      const startHeight = answer.scrollHeight;
      answer.style.height = `${startHeight}px`;
      answer.style.paddingTop = originalPaddingTop;
      answer.style.paddingBottom = originalPaddingBottom;
      answer.style.borderTopWidth = originalBorderTopWidth;

      answer.getBoundingClientRect();

      answer.style.transition = [
        `height ${animationDuration}ms ${animationEasing}`,
        `padding ${animationDuration}ms ${animationEasing}`,
        `border-top-width ${animationDuration}ms ${animationEasing}`,
      ].join(', ');

      answer.style.height = '0px';
      answer.style.paddingTop = '0px';
      answer.style.paddingBottom = '0px';
      answer.style.borderTopWidth = '0px';

      window.setTimeout(() => {
        item.open = false;
        answer.style.height = '';
        answer.style.paddingTop = '';
        answer.style.paddingBottom = '';
        answer.style.borderTopWidth = '';
        answer.style.transition = '';
        isAnimating = false;
      }, animationDuration);
    };

    const toggleAnswer = () => {
      if (item.open) {
        closeAnswer();
      } else {
        openAnswer();
      }
    };

    summary.addEventListener('click', (event) => {
      event.preventDefault();
      toggleAnswer();
    });

    answer.addEventListener('click', () => {
      if (item.open) {
        closeAnswer();
      }
    });
  });
});
