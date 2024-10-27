import React, { useState } from "react";

export const Integral = ({ onSubmit }) => {
  const [expression, setExpression] = useState("");
  const [lowerLimit, setLowerLimit] = useState("");
  const [upperLimit, setUpperLimit] = useState("");
  const [isDefinite, setIsDefinite] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ expression, lowerLimit, upperLimit, isDefinite });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="center">
        <div className="form-group">
          <label>Función a integrar:</label>
          <input
            type="text"
            className="form-control"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Por ejemplo, x^2"
            required
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isDefinite}
            onChange={() => setIsDefinite(!isDefinite)}
          />
          <label className="form-check-label">Integral Definida</label>
        </div>
        {isDefinite && (
          <div className="row">
            <div className="col">
              <label>Límite Inferior:</label>
              <input
                type="number"
                className="form-control"
                value={lowerLimit}
                onChange={(e) => setLowerLimit(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label>Límite Superior:</label>
              <input
                type="number"
                className="form-control"
                value={upperLimit}
                onChange={(e) => setUpperLimit(e.target.value)}
                required
              />
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary mt-3">
          Calcular Integral
        </button>
      </div>
    </form>
  );
};
