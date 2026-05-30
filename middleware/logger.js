export const logger = (req, res, next) => {
  const startTime = Date.now();

  // Log the incoming request
  console.log(`\n[${ new Date().toISOString() }] ${req.method} ${req.originalUrl}`);

  // Capture response
  const originalJson = res.json;
  res.json = function (data) {
    const duration = Date.now() - startTime;
    console.log(`Response Status: ${res.statusCode} (${duration}ms)`);
    return originalJson.call(this, data);
  };

  next();
};
