<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Redirect the user to the provider authentication page.
     *
     * @param string $provider
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirect($provider)
    {
        // Make sure we're calling redirect() on the driver
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information from the provider.
     *
     * @param string $provider
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
            
            // Find existing user or create new based on provider id
            $user = User::where([
                'provider' => $provider,
                'provider_id' => $socialUser->getId()
            ])->first();
            
            // If user doesn't exist, create it
            if (!$user) {
                // Check if email already exists
                $existingUser = User::where('email', $socialUser->getEmail())->first();
                
                if ($existingUser) {
                    // Update existing user with provider details
                    $existingUser->update([
                        'provider' => $provider,
                        'provider_id' => $socialUser->getId(),
                        'provider_token' => $socialUser->token,
                    ]);
                    
                    $user = $existingUser;
                } else {
                    // Create new user
                    $user = User::create([
                        'name' => $socialUser->getName(),
                        'email' => $socialUser->getEmail(),
                        'password' => bcrypt(uniqid()), // random password
                        'provider' => $provider,
                        'provider_id' => $socialUser->getId(),
                        'provider_token' => $socialUser->token,
                    ]);
                }
            }
            
            // Login the user
            Auth::login($user, true);
            
            return redirect()->intended('/dashboard');
            
        } catch (Exception $e) {
            return redirect('/login')
                ->withErrors(['error' => 'Unable to login with ' . $provider . ': ' . $e->getMessage()]);
        }
    }
}