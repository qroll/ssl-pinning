package com.sslpinning;

import android.util.Log;

import java.io.IOException;

import javax.net.ssl.SSLHandshakeException;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

public class PinningInterceptor implements Interceptor {

    private static String TAG ="@@@";

    @Override
    public Response intercept(Interceptor.Chain chain) throws IOException {
        Request request = chain.request();
        Response response = null;
       
        try {
            response = chain.proceed(request);
        } catch (SSLHandshakeException e) {
            Log.e(TAG, e.getMessage(), e);
            throw e;
        }

        return response;
    }

}
