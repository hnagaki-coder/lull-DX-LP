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

  if (visionTitle && visionText) {
    const revealVisionText = () => {
      visionText.classList.add('is-inview');
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

  const regionHeader = document.querySelector('.region-dx__header-bg');
  const regionItems = document.querySelectorAll('.region-dx__item');

  if (regionHeader && regionItems.length > 0) {
    const revealRegionItems = () => {
      regionItems.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${index * 120}ms`);
        item.classList.add('is-inview');
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealRegionItems();
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(regionHeader);
    } else {
      revealRegionItems();
    }
  }

  const partnerTitles = document.querySelectorAll('.partners__region-title');

  if (partnerTitles.length > 0) {
    const revealPartnerContent = (titleElement) => {
      const content = titleElement.nextElementSibling;
      if (content && content.classList.contains('partners__content')) {
        content.classList.add('is-inview');
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealPartnerContent(entry.target);
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      partnerTitles.forEach((title) => observer.observe(title));
    } else {
      partnerTitles.forEach((title) => revealPartnerContent(title));
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

  const testimonialsList = document.querySelector('.testimonials__list');
  const testimonialsItems = document.querySelectorAll('.testimonials__item');

  if (testimonialsList && testimonialsItems.length > 0) {
    const revealTestimonialsItems = () => {
      testimonialsItems.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${index * 200}ms`);
        item.classList.add('is-inview');
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealTestimonialsItems();
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(testimonialsList);
    } else {
      revealTestimonialsItems();
    }
  }

  const diagramWrapper = document.querySelector('.diagram-wrapper');
  const outerCircles = document.querySelectorAll('.diagram-wrapper .outer-circle');
  const innerCircles = document.querySelectorAll('.diagram-wrapper .inner-circle');
  const nodeGroups = document.querySelectorAll('.diagram-wrapper .node-group');
  const mobileDescContainer = document.querySelector('.have__descriptions');
  const descNodes = document.querySelectorAll('.diagram-wrapper .description');
  const originalDescParents = new Map();
  descNodes.forEach((d) => originalDescParents.set(d, d.parentElement));

  if (diagramWrapper && outerCircles.length > 0) {
    const revealDiagram = () => {
      outerCircles.forEach((circle, index) => {
        const delay = `${index * 300}ms`;
        circle.style.setProperty('--reveal-delay', delay);
        circle.classList.add('is-inview');

        const innerCircle = innerCircles[index];
        if (innerCircle) {
          innerCircle.style.setProperty('--reveal-delay', delay);
          innerCircle.classList.add('is-inview');
        }
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

      const nodeObserver = new IntersectionObserver(
        (entries, observerInstance) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const description = entry.target.querySelector('.description');
              if (description) {
                const index = Array.from(nodeGroups).indexOf(entry.target);
                const delay = index >= 0 ? `${index * 300}ms` : '0ms';
                description.style.setProperty('--reveal-delay', delay);
                description.classList.add('is-inview');
              }
              observerInstance.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.3,
        }
      );

      nodeGroups.forEach((group) => nodeObserver.observe(group));
    } else {
      revealDiagram();
      nodeGroups.forEach((group) => {
        const description = group.querySelector('.description');
        if (description) {
          const index = Array.from(nodeGroups).indexOf(group);
          const delay = index >= 0 ? `${index * 300}ms` : '0ms';
          description.style.setProperty('--reveal-delay', delay);
          description.classList.add('is-inview');
        }
      });
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
