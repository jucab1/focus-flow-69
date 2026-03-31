import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Sparkles, X } from 'lucide-react';

interface MessageBarProps {
  onSubmit: (text: string) => void;
}

const MessageBar = ({ onSubmit }: MessageBarProps) => {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState('');

  const handleFocus = () => setExpanded(true);
  const handleClose = () => {
    setExpanded(false);
    setText('');
  };
  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
      setText('');
      setExpanded(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Bar */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className={`relative z-50 ${expanded ? 'fixed inset-0 flex items-center justify-center p-6' : ''}`}
      >
        <motion.div
          layout
          className={`w-full ${expanded ? 'max-w-2xl' : 'max-w-3xl mx-auto'}`}
        >
          <div className="p-[2px] rounded-bubbly gradient-outline">
            <div className="bg-card rounded-[26px] overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4">
                <motion.div layout className="flex-1">
                  {expanded ? (
                    <textarea
                      autoFocus
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="You have my full attention. Dump everything here—I'll sort it out."
                      className="w-full bg-transparent resize-none outline-none font-body text-foreground placeholder:text-muted-foreground min-h-[100px]"
                    />
                  ) : (
                    <input
                      onFocus={handleFocus}
                      readOnly
                      placeholder="Vibe-check: What's on your mind? Type or speak a mess..."
                      className="w-full bg-transparent outline-none font-body text-foreground placeholder:text-muted-foreground cursor-pointer"
                    />
                  )}
                </motion.div>
                {!expanded && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                  >
                    <Mic className="w-5 h-5" />
                  </motion.button>
                )}
                {expanded && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground self-start"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSubmit}
                      className="bubbly-btn w-full py-3 gradient-lavender text-primary-foreground flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Process</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MessageBar;
