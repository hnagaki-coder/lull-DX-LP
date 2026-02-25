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

  const visionTitle = document.querySelector('.vision__title');
  const visionText = document.querySelector('.vision__text');
  const visionAction = document.querySelector('.vision__action');

  if (visionTitle && visionText) {
    const revealVisionText = () => {
      visionTitle.style.setProperty('--reveal-delay', '0ms');
      visionTitle.classList.add('is-inview');

      visionText.classList.add('is-inview');

      if (visionAction) {
        visionAction.style.setProperty('--reveal-delay', '160ms');
        visionAction.classList.add('is-inview');
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealVisionText();
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.3,
        }
      );

      observer.observe(visionTitle);
    } else {
      revealVisionText();
    }
  }

  const regionHeader = document.querySelector('.region-dx__header');
  const regionHeaderBg = document.querySelector('.region-dx__header-bg');

  if (regionHeader) {
    const revealRegionHeader = () => {
      Array.from(regionHeader.children).forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${index * 140}ms`);
      });
      regionHeader.classList.add('is-inview');
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealRegionHeader();
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      if (regionHeaderBg) {
        observer.observe(regionHeaderBg);
      } else {
        observer.observe(regionHeader);
      }
    } else {
      revealRegionHeader();
    }
  }

  const partnersSection = document.querySelector('.partners');
  const partnersTitle = document.querySelector('.partners__title-area');
  const partnerCards = document.querySelectorAll('.partners .area-card');

  if (partnersSection && (partnersTitle || partnerCards.length > 0)) {
    const revealPartners = () => {
      if (partnersTitle) {
        partnersTitle.style.setProperty('--reveal-delay', '0ms');
        partnersTitle.classList.add('is-inview');
      }

      partnerCards.forEach((card, index) => {
        card.style.setProperty('--reveal-delay', `${120 + index * 140}ms`);
        card.classList.add('is-inview');
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealPartners();
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(partnersSection);
    } else {
      revealPartners();
    }
  }

  const solutionList = document.querySelector('.solution__list');
  const solutionItems = document.querySelectorAll('.solution__item');

  if (solutionList && solutionItems.length > 0) {
    const revealSolutionItems = () => {
      solutionItems.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${index * 200}ms`);
        item.classList.add('is-inview');
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealSolutionItems();
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(solutionList);
    } else {
      revealSolutionItems();
    }
  }

  const diagramWrapper = document.querySelector('.diagram-wrapper');
  const innerCircles = document.querySelectorAll('.diagram-wrapper .inner-circle');
  const mobileDescContainer = document.querySelector('.have__descriptions');
  const descNodes = document.querySelectorAll('.diagram-wrapper .description');
  const originalDescParents = new Map();
  descNodes.forEach((d) => originalDescParents.set(d, d.parentElement));

  if (diagramWrapper && innerCircles.length > 0) {
    const revealDiagram = () => {
      innerCircles.forEach((innerCircle, index) => {
        const delay = `${index * 300}ms`;
        innerCircle.style.setProperty('--reveal-delay', delay);
        innerCircle.classList.add('is-inview');
      });
    };

    if ('IntersectionObserver' in window) {
      const diagramObserver = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealDiagram();
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.3,
        }
      );

      diagramObserver.observe(diagramWrapper);
    } else {
      revealDiagram();
    }
  }

  // Mobile-only: move description texts below the diagram for vertical stacking
  const mqMobileHave = window.matchMedia('(max-width: 640px)');
  const moveDescriptionsForMobile = () => {
    if (!mobileDescContainer) return;
    if (mqMobileHave.matches) {
      descNodes.forEach((d) => {
        if (d.parentElement === mobileDescContainer || d.parentElement?.classList?.contains('have__desc-item')) {
          return; // already moved
        }
        const parent = originalDescParents.get(d);
        let titleText = '';
        if (parent) {
          const inner = parent.querySelector('.inner-circle');
          if (inner) titleText = inner.textContent.trim().replace(/\s+/g, ' ');
        }
        const item = document.createElement('div');
        item.className = 'have__desc-item';
        if (parent) {
          const pos = ['tl', 'tr', 'bl', 'br'].find((cls) => parent.classList.contains(cls));
          if (pos) item.classList.add(`pos-${pos}`);
        }
        const titleEl = document.createElement('h4');
        titleEl.className = 'have__desc-title';
        titleEl.textContent = titleText;
        item.appendChild(titleEl);
        item.appendChild(d);
        mobileDescContainer.appendChild(item);
      });
    } else {
      // Restore to original node-group (prepend to keep original order before circles) and remove wrappers/titles
      descNodes.forEach((d) => {
        const parent = originalDescParents.get(d);
        // capture current wrapper before moving d
        const wrapper = d.parentElement;
        if (parent && wrapper !== parent) {
          parent.prepend(d);
        }
        if (wrapper && wrapper.classList && wrapper.classList.contains('have__desc-item')) {
          wrapper.remove();
        }
      });
    }
  };
  moveDescriptionsForMobile();
  mqMobileHave.addEventListener ? mqMobileHave.addEventListener('change', moveDescriptionsForMobile) : mqMobileHave.addListener(moveDescriptionsForMobile);

  const flowPanel = document.querySelector('.flow__panel');
  const flowNodes = document.querySelectorAll('.flow__node');

  if (flowPanel && flowNodes.length > 0) {
    const revealFlowNodes = () => {
      flowNodes.forEach((node, index) => {
        node.style.setProperty('--reveal-delay', `${index * 200}ms`);
        node.classList.add('is-inview');
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealFlowNodes();
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(flowPanel);
    } else {
      revealFlowNodes();
    }
  }

  const requirementsBox = document.querySelector('.requirements__box');

  if (requirementsBox) {
    const revealRequirements = () => {
      requirementsBox.classList.add('is-inview');
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealRequirements();
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(requirementsBox);
    } else {
      revealRequirements();
    }
  }

  const selectionCircles = document.querySelector('.selection__circles');
  const selectionCircleItems = document.querySelectorAll('.selection__circle');

  if (selectionCircles && selectionCircleItems.length > 0) {
    const revealSelectionCircles = () => {
      selectionCircleItems.forEach((circle, index) => {
        circle.style.setProperty('--reveal-delay', `${index * 160}ms`);
        circle.classList.add('is-inview');
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealSelectionCircles();
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(selectionCircles);
    } else {
      revealSelectionCircles();
    }
  }

  const selectionFlow = document.querySelector('.selection__flow');
  const selectionFlowItems = document.querySelectorAll('.selection__flow .selection__box, .selection__flow .selection__arrow');

  if (selectionFlow && selectionFlowItems.length > 0) {
    const revealSelectionFlow = () => {
      selectionFlowItems.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${index * 180}ms`);
        item.classList.add('is-inview');
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealSelectionFlow();
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(selectionFlow);
    } else {
      revealSelectionFlow();
    }
  }
});
