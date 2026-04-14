"use client";

import { useState } from "react";

interface Field {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "array";
}

interface ArrayEditorProps {
  title: string;
  items: Record<string, unknown>[];
  schema: Field[];
  onUpdate: (newItems: Record<string, unknown>[]) => void;
  addItemLabel?: string;
}

export default function ArrayEditor({ title, items, schema, onUpdate, addItemLabel = "Add Item" }: ArrayEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleFieldChange = (index: number, key: string, value: unknown) => {
    const newItems = [...items];
    const targetItem = newItems[index] as Record<string, unknown>;
    if (key.includes(".")) {
      // Handle nested fields like tags (array field specifically for project tags)
      const keys = key.split(".");
      const firstKey = keys[0];
      targetItem[firstKey] = value;
    } else {
      targetItem[key] = value;
    }
    onUpdate(newItems);
  };

  const addItem = () => {
    const defaultItem: Record<string, unknown> = {};
    schema.forEach(field => {
      if (field.type === "array") {
        defaultItem[field.key] = [];
      } else {
        defaultItem[field.key] = "";
      }
    });
    // Add a unique ID if it doesn't exist
    if (schema.some(f => f.key === "id")) {
      defaultItem.id = `item-${Date.now()}`;
    }
    onUpdate([...items, defaultItem]);
    setExpandedIndex(items.length); // Expand the new item
  };

  const removeItem = (index: number) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const newItems = items.filter((_, i) => i !== index);
      onUpdate(newItems);
      if (expandedIndex === index) setExpandedIndex(null);
    }
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === items.length - 1)) return;
    const newItems = [...items];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    onUpdate(newItems);
    if (expandedIndex === index) setExpandedIndex(swapIndex);
    else if (expandedIndex === swapIndex) setExpandedIndex(index);
  };

  return (
    <div className="array-editor">
      <div className="editor-header">
        <h3>{title}</h3>
        <button className="add-btn" onClick={addItem}>+ {addItemLabel}</button>
      </div>

      <div className="items-list">
        {items.map((item, index) => (
          <div key={item.id || index} className={`item-container ${expandedIndex === index ? 'expanded' : ''}`}>
            <div className="item-summary" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
              <span className="item-title">
                {String(item[schema[0]?.key] || `Item #${index + 1}`)}
              </span>
              <div className="item-controls">
                <button onClick={(e) => { e.stopPropagation(); moveItem(index, "up"); }} disabled={index === 0}>↑</button>
                <button onClick={(e) => { e.stopPropagation(); moveItem(index, "down"); }} disabled={index === items.length - 1}>↓</button>
                <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeItem(index); }}>×</button>
              </div>
            </div>

            {expandedIndex === index && (
              <div className="item-fields">
                {schema.map(field => (
                  <div key={field.key} className="field-group">
                    <label>{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea 
                        rows={3}
                        value={item[field.key] || ""}
                        onChange={(e) => handleFieldChange(index, field.key, e.target.value)}
                      />
                    ) : field.type === "array" ? (
                      <input 
                        type="text" 
                        placeholder="Comma separated values"
                        value={Array.isArray(item[field.key]) ? (item[field.key] as string[]).join(", ") : String(item[field.key] || "")}
                        onChange={(e) => handleFieldChange(index, field.key, e.target.value.split(",").map(s => s.trim()))}
                      />
                    ) : (
                      <input 
                        type="text"
                        value={item[field.key] || ""}
                        onChange={(e) => handleFieldChange(index, field.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .array-editor { margin-bottom: 30px; }
        .editor-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .add-btn { background: var(--primary-container); color: white; border: none; padding: 6px 14px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; }
        .items-list { display: flex; flex-direction: column; gap: 10px; }
        .item-container { border: 1px solid var(--glass-border); border-radius: 8px; overflow: hidden; background: rgba(0,0,0,0.1); }
        .item-summary { padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s; }
        .item-summary:hover { background: rgba(255,255,255,0.05); }
        .item-title { font-weight: 500; font-size: 0.9rem; color: var(--on-surface); }
        .item-controls { display: flex; gap: 8px; }
        .item-controls button { background: transparent; border: 1px solid var(--glass-border); color: var(--on-surface-variant); cursor: pointer; border-radius: 4px; padding: 2px 8px; }
        .remove-btn { color: #e74c3c !important; }
        .item-fields { padding: 16px; border-top: 1px solid var(--glass-border); display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field-group { display: flex; flex-direction: column; gap: 6px; }
        .field-group label { font-size: 0.7rem; text-transform: uppercase; color: var(--on-surface-variant); }
        .field-group input, .field-group textarea { background: var(--surface-container); border: 1px solid var(--glass-border); padding: 10px; color: var(--on-surface); border-radius: 4px; font-size: 0.85rem; }
        .field-group input:focus, .field-group textarea:focus { border-color: var(--primary-container); outline: none; }
        @media (max-width: 640px) { .item-fields { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
