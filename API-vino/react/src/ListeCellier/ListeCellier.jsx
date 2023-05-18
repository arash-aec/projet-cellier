import React from "react";

export default class ListeCellier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      listeCellier: []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/listeCellier")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            listeCellier: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, listeCellier } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {listeCellier.map(item => (
            <li key={item.id}>
              <strong>{item.id_bouteille}</strong> : {item.notes}
            </li>
          ))}
        </ul>
      );
    }
  }
}
