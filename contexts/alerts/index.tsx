import React, { useCallback, useState } from "react";
import { Alerts } from "~/components/layouts/alerts";

export interface AlertModel {
  readonly title?: string;
  readonly text: string;
  readonly status: "info" | "warning" | "success" | "error";
}

export interface AlertsContextValues {
  readonly alerts: AlertModel[];
  readonly addAlert?: (alert: AlertModel) => AlertModel;
  readonly removeAlert?: (index: number) => AlertModel;
}

export const AlertsContext = React.createContext<AlertsContextValues>({
  alerts: [],
});

const AlertsContextProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback((alert: AlertModel) => {
    setAlerts((old) => [...old, alert]);
    return alert;
  }, []);

  const removeAlert = useCallback(
    (index: number) => {
      const alert = alerts[index];
      if (alert) {
        setAlerts((old) => old.filter((_, i) => i !== index));
      }
      return alert;
    },
    [alerts]
  );

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        addAlert,
        removeAlert,
      }}
    >
      {children}
      <Alerts />
    </AlertsContext.Provider>
  );
};

export default AlertsContextProvider;
