import React, { useState } from "react";
import { create, all } from "mathjs";
import { Result } from "./Result";
import { Integral } from "./Integral";
import { Graph } from "./Graph";

// Crear un entorno con todas las funciones de math.js
const math = create(all);
const parser = math.parser();

export const Father = () => {
  const [result, setResult] = useState("");
  const [graphData, setGraphData] = useState(null);

  // Función que maneja el envío del formulario
  const handleFormSubmit = ({
    expression,
    lowerLimit,
    upperLimit,
    isDefinite,
  }) => {
    try {
      let integralResult;

      if (isDefinite) {
        // Evaluamos la integral definida usando la regla trapezoidal
        integralResult = trapezoidalIntegration(
          expression,
          parseFloat(lowerLimit),
          parseFloat(upperLimit)
        );
      } else {
        setResult(
          "Integrales indefinidas no soportadas por el parser de math.js"
        );
        return;
      }

      setResult(integralResult.toString());
      plotGraph(expression); // Llamar a plotGraph para graficar la función
    } catch (error) {
      console.error("Error al evaluar la integral:", error); // Mostrar el error en la consola
      setResult(`Error: Verifica tu expresión. Detalle: ${error.message}`); // Mostrar el error detallado
    }
  };

  // Función para realizar la integración numérica usando la regla trapezoidal
  const trapezoidalIntegration = (expression, a, b) => {
    const n = 1000; 
    const h = (b - a) / n; 
    let sum = 0;

    for (let i = 0; i <= n; i++) {
      const x = a + i * h;
      try {
        // Evaluamos la expresión como una función
        parser.evaluate(`f(x) = ${expression}`); // Definir f(x)
        const result = parser.evaluate(`f(${x})`); // Evaluar f(x) en el punto x
        if (i === 0 || i === n) {
          sum += result; // Los puntos extremos cuentan solo una vez
        } else {
          sum += 2 * result; // Los puntos intermedios cuentan el doble
        }
      } catch (error) {
        console.error(
          `Error al evaluar la función en x = ${x}:`,
          error.message
        );
        throw new Error("La función ingresada no es válida.");
      }
    }

    return (h / 2) * sum; // Resultado de la regla trapezoidal
  };

  // Función para graficar la función ingresada
  const plotGraph = (expression) => {
    let xValues = [];
    let yValues = [];
    try {
      // Definir la función f(x)
      parser.evaluate(`f(x) = ${expression}`);

      for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x.toFixed(2));
        try {
          const y = parser.evaluate(`f(${x})`);
          yValues.push(y);
        } catch (error) {
          console.error(
            `Error al graficar la función en x = ${x}:`,
            error.message
          );
          yValues.push(null);
        }
      }

      const data = {
        labels: xValues,
        datasets: [
          {
            label: `y = ${expression}`,
            data: yValues,
            borderColor: "rgba(75, 192, 192, 1)",
            fill: true,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      };
      setGraphData(data);
    } catch (error) {
      console.error(
        "Error al definir la función para la gráfica:",
        error.message
      );
      throw new Error("La función ingresada no es válida.");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">Calculadora de Integrales</h1>
      <Integral onSubmit={handleFormSubmit} />
      {result && <Result result={result} />}
      {graphData && <Graph graphData={graphData} />}
    </div>
  );
};
