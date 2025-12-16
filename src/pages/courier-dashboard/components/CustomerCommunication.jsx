import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerCommunication = ({ messages, onSendMessage, onClose }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage?.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full h-[600px] flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={messages?.customer?.image}
              alt={messages?.customer?.imageAlt}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {messages?.customer?.name}
              </h3>
              <p className="text-xs text-muted-foreground">Order #{messages?.orderId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-muted transition-colors duration-150 flex items-center justify-center"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.conversation?.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg?.sender === 'courier' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg?.sender === 'courier' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{msg?.message}</p>
                <p className={`text-xs mt-1 ${
                  msg?.sender === 'courier' ?'text-primary-foreground/70' :'text-muted-foreground'
                }`}>
                  {msg?.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e?.target?.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button
              variant="default"
              iconName="Send"
              onClick={handleSend}
              disabled={!newMessage?.trim()}
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Button variant="ghost" size="sm" iconName="Phone">
              Call
            </Button>
            <Button variant="ghost" size="sm" iconName="MapPin">
              Share Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCommunication;