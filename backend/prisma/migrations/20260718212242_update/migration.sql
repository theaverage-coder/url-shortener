-- CreateIndex
CREATE INDEX "Click_urlId_idx" ON "Click"("urlId");

-- CreateIndex
CREATE INDEX "Click_urlId_timestamp_idx" ON "Click"("urlId", "timestamp");

-- CreateIndex
CREATE INDEX "Click_urlId_visitor_idx" ON "Click"("urlId", "visitor");

-- CreateIndex
CREATE INDEX "Url_userId_idx" ON "Url"("userId");
