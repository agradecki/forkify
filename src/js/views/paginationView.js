import icons from 'url:../../img/icons.svg'; // Parcel 2

import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 , and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextBtn(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePrevBtn(curPage);
    }

    // Other page
    if (curPage < numPages) {
      return this._generatePrevAndNextBtn(curPage);
    }

    // Page 1, and there are no other pages
    return '';
  }

  _generateNextBtn(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
  }

  _generatePrevBtn(curPage) {
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
      `;
  }

  _generatePrevAndNextBtn(curPage) {
    return `${this._generatePrevBtn(curPage)}${this._generateNextBtn(curPage)}`;
  }
}

export default new PaginationView();
