import Part from './Part';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) =>
        <Part
          key={i}
          name={part.name}
          exercises={part.exercises}
        />
      )}
    </div>
  );
};

export default Content;