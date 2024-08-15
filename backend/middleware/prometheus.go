package middleware

import (
	"net/http"

	"github.com/prometheus/client_golang/prometheus"
)

var totalRequests = prometheus.NewCounterVec(
	prometheus.CounterOpts{
		Name: "http_requests_total",
		Help: "Number of get requests.",
	},
	[]string{"path"},
)

func prometheusMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rw := w.(http.ResponseWriter)
		next.ServeHTTP(rw, r)

		//totalRequests.WithLabelValues(path).Inc()
	})
}

func init() {
	prometheus.Register(totalRequests)
}
