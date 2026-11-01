'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export function CalculatorApp({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = useCallback((num: string) => {
    setDisplay(prev => {
      if (waitingForOperand) {
        setWaitingForOperand(false);
        return num === '.' ? '0.' : num;
      }
      if (num === '.' && prev.includes('.')) return prev;
      if (prev === '0' && num !== '.') return num;
      return prev + num;
    });
  }, [waitingForOperand]);

  const handleOperation = useCallback((op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue !== null && operation && !waitingForOperand) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    
    setOperation(op);
    setWaitingForOperand(true);
  }, [display, previousValue, operation, waitingForOperand]);

  const handleEquals = useCallback(() => {
    if (previousValue !== null && operation && !waitingForOperand) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      const expression = `${previousValue} ${operation} ${currentValue} = ${result}`;
      setHistory(prev => [expression, ...prev].slice(0, 10));
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [display, previousValue, operation, waitingForOperand]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const handleSign = useCallback(() => {
    setDisplay(prev => prev === '0' ? '0' : prev.startsWith('-') ? prev.slice(1) : '-' + prev);
  }, []);

  const handlePercent = useCallback(() => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  }, [display]);

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : NaN;
      default: return b;
    }
  };

  const formatDisplay = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return 'Error';
    if (!isFinite(num)) return 'Error';
    return num.toLocaleString(undefined, { maximumFractionDigits: 10 });
  };

  return (
    <div className="flex h-full flex-col bg-[var(--color-bg-primary)]" style={{ width: 340 }}>
      {/* Title Bar handled by Window component */}
      <div className="flex-1 flex flex-col">
        {/* Display */}
        <div className="p-4 bg-[var(--color-surface-primary)] border-b border-[var(--color-border-primary)]">
          <div className="text-right">
            {history.length > 0 && (
              <div className="text-xs text-[var(--color-text-tertiary)] mb-1 h-4 overflow-hidden">
                {history[0]}
              </div>
            )}
            <div className="text-4xl font-light text-[var(--color-text-primary)] font-mono tabular-nums">
              {formatDisplay(display)}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex-1 p-3 bg-[var(--color-bg-primary)] grid grid-cols-4 gap-2">
          {buttons.map((row, rowIndex) => 
            row.map((btn, colIndex) => {
              const isOperator = ['÷', '×', '−', '+', '='].includes(btn);
              const isFunction = ['C', '±', '%'].includes(btn);
              const isZero = btn === '0';
              
              return (
                <Button
                  key={`${rowIndex}-${colIndex}`}
                  size="lg"
                  className={cn(
                    'h-14 w-14 rounded-xl font-medium text-lg transition-all',
                    'active:scale-[0.95]',
                    isOperator ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-hover)]' : '',
                    isFunction ? 'bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]' : '',
                    !isOperator && !isFunction ? 'bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]' : '',
                    isZero && 'col-span-2 w-auto'
                  )}
                  onClick={() => {
                    if (btn >= '0' && btn <= '9' || btn === '.') handleNumber(btn);
                    else if (isOperator && btn !== '=') handleOperation(btn);
                    else if (btn === '=') handleEquals();
                    else if (btn === 'C') handleClear();
                    else if (btn === '±') handleSign();
                    else if (btn === '%') handlePercent();
                  }}
                >
                  {btn}
                </Button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}