import "./page-heading.css";

export const PageHeading = (props) => {
  return (
    <div className="page-heading">
      <div className="page-heading-contents">
        <h1 className="page-heading-heading">{props.data.heading}</h1>
        <div className="page-heading-subheading">{props.data.subheading}</div>
        <div className="page-heading-body">{props.data.body}</div>
      </div>
    </div>
  );
};
