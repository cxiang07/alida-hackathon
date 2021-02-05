import Chip from "@material-ui/core/Chip";

export const TagsCell = (props) => {
  const tags = props.tags;

  return (
    <>
      {tags.map((tag) => {
        return <Chip label={tag} color="primary" />;
      })}
    </>
  );
};
