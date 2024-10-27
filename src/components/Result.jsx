import React from 'react'

export const Result = ({ result }) => {
    return (
        <div className="alert alert-info mt-3">
          <h5>Resultado:</h5>
          <p>{result}</p>
        </div>
      );
}
