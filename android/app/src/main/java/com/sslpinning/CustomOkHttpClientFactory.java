package com.sslpinning;

import com.datatheorem.android.trustkit.pinning.OkHttp3Helper;
import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;

import okhttp3.OkHttpClient;

public class CustomOkHttpClientFactory implements OkHttpClientFactory {
    public OkHttpClient createNewNetworkModuleClient() {
        OkHttpClient client =
                OkHttpClientProvider.createClientBuilder()
                        .sslSocketFactory(OkHttp3Helper.getSSLSocketFactory(), OkHttp3Helper.getTrustManager())
                        .addInterceptor(OkHttp3Helper.getPinningInterceptor())
                        .addInterceptor(new PinningInterceptor())
                        .build();
        return client;
    }
}
