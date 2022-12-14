import { ReactComponent as ArrowIcon } from "../../assets/images/Seta.svg";
import ReactPaginate from "react-paginate";
import "./styles.css";

const Pagination = ({ forcePage, pageCount, range, onChange, onClick }) => {
  return (
    <>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={range}
        marginPagesDisplayed={1}
        containerClassName="pagination-container"
        pageLinkClassName="pagination-item"
        breakClassName="pagination-item"
        previousLabel={
          <div className="pag-arrow-container" data-testid="arrow-previous">
            <ArrowIcon />
          </div>
        }
        nextLabel={
          <div className="pag-arrow-container" data-testid="arrow-next">
            <ArrowIcon />
          </div>
        }
        previousClassName="arrow-previous"
        nextClassName="arrow-next"
        activeLinkClassName="pag-active"
        disabledClassName="arrow-inactive"
        nextLinkClassName="arrow-active"
        previousLinkClassName="arrow-active"
        forcePage={forcePage}
        onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
        //onClick={() => onClick()}
      />
    </>
  );
};

export default Pagination;
