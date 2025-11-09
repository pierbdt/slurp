<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Profile extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'gender',
        'looking_for',
        'date_of_birth',
        'snapchat_username',
        'bio',
        'is_complete',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'is_complete' => 'boolean',
        ];
    }

    /**
     * Calculate age from date of birth.
     */
    protected function age(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->date_of_birth
                ? Carbon::parse($this->date_of_birth)->age
                : null,
        );
    }

    /**
     * Validation rules for profile creation.
     */
    public static function rules(): array
    {
        return [
            'user_id' => 'required|uuid|unique:profiles,user_id',
            'gender' => 'required|in:male,female',
            'looking_for' => 'required|in:male,female',
            'date_of_birth' => 'required|date|before:-18 years',
            'snapchat_username' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:500',
        ];
    }

    /**
     * Validation rules for profile updates.
     */
    public static function updateRules(): array
    {
        return [
            'gender' => 'sometimes|in:male,female',
            'looking_for' => 'sometimes|in:male,female',
            'date_of_birth' => 'sometimes|date|before:-18 years',
            'snapchat_username' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:500',
        ];
    }
}
