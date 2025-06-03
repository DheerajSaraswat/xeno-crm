import React, { useState } from "react";

export default function RuleBuilder({ onRulesChange }) {
  const [rules, setRules] = useState([
    { field: "spend", operator: ">", value: "10000" },
  ]);
  const [logic, setLogic] = useState("AND");

  const handleChange = (idx, key, val) => {
    const updated = rules.map((rule, i) =>
      i === idx ? { ...rule, [key]: val } : rule
    );
    setRules(updated);
    onRulesChange({ logic, rules: updated });
  };

  return (
    <div>
      <h4>Audience Rules</h4>
      {rules.map((rule, i) => (
        <div key={i}>
          <select
            value={rule.field}
            onChange={(e) => handleChange(i, "field", e.target.value)}
          >
            <option value="spend">Spend</option>
            <option value="visits">Visits</option>
            <option value="inactive_days">Inactive Days</option>
          </select>
          <select
            value={rule.operator}
            onChange={(e) => handleChange(i, "operator", e.target.value)}
          >
            <option value=">">{">"}</option>
            <option value="<">{"<"}</option>
            <option value="=">{"="}</option>
          </select>
          <input
            type="text"
            value={rule.value}
            onChange={(e) => handleChange(i, "value", e.target.value)}
          />
        </div>
      ))}
      <div>
        Combine with:
        <select value={logic} onChange={(e) => setLogic(e.target.value)}>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>
      <button
        onClick={() =>
          setRules([...rules, { field: "spend", operator: ">", value: "" }])
        }
      >
        + Add Rule
      </button>
    </div>
  );
}
