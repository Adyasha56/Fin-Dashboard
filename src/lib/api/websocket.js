class FinanceWebSocket {
  constructor() {
    this.ws = null;
    this.subscribers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000;
    this.isConnecting = false;
  }

  connect(apiKey) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    if (this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    try {
      this.ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        
        // Wait a bit before sending subscriptions
        setTimeout(() => {
          if (this.ws?.readyState === WebSocket.OPEN) {
            this.subscribers.forEach((callbacks, symbol) => {
              try {
                this.ws.send(JSON.stringify({ type: 'subscribe', symbol }));
                console.log(`Subscribed to ${symbol}`);
              } catch (error) {
                console.error(`Failed to subscribe to ${symbol}:`, error);
              }
            });
          }
        }, 100);
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.type === 'trade') {
            message.data?.forEach((trade) => {
              const callbacks = this.subscribers.get(trade.s);
              if (callbacks) {
                callbacks.forEach(callback => {
                  try {
                    callback(trade);
                  } catch (error) {
                    console.error('Callback error:', error);
                  }
                });
              }
            });
          } else if (message.type === 'ping') {
            // Respond to ping
            if (this.ws?.readyState === WebSocket.OPEN) {
              this.ws.send(JSON.stringify({ type: 'pong' }));
            }
          }
        } catch (error) {
          console.error('Message parsing error:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnecting = false;
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.isConnecting = false;
        this.reconnect(apiKey);
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      this.isConnecting = false;
    }
  }

  reconnect(apiKey) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    setTimeout(() => {
      console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
      this.connect(apiKey);
    }, this.reconnectDelay);
  }

  subscribe(symbol, callback) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    
    this.subscribers.get(symbol).add(callback);

    // Send subscribe message if WebSocket is open
    if (this.ws?.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify({ type: 'subscribe', symbol }));
        console.log(`Subscribed to ${symbol}`);
      } catch (error) {
        console.error(`Failed to subscribe to ${symbol}:`, error);
      }
    }

    // Return unsubscribe function
    return () => this.unsubscribe(symbol, callback);
  }

  unsubscribe(symbol, callback) {
    const callbacks = this.subscribers.get(symbol);
    if (callbacks) {
      callbacks.delete(callback);
      
      // If no more subscribers, unsubscribe from WebSocket
      if (callbacks.size === 0) {
        this.subscribers.delete(symbol);
        if (this.ws?.readyState === WebSocket.OPEN) {
          try {
            this.ws.send(JSON.stringify({ type: 'unsubscribe', symbol }));
            console.log(`Unsubscribed from ${symbol}`);
          } catch (error) {
            console.error(`Failed to unsubscribe from ${symbol}:`, error);
          }
        }
      }
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscribers.clear();
    this.isConnecting = false;
  }
}

// Singleton instance
export const financeWebSocket = new FinanceWebSocket();