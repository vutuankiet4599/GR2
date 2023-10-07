<?php

namespace App\Repositories;

interface ModelRepositoryInterface
{
    /**
     * Get all.
     */
    public function getAll();

    /**
     * Get one.
     */
    public function find($id);

    /**
     * Create.
     *
     * @param array $attributes
     */
    public function create($attributes = []);

    /**
     * Update.
     *
     * @param array $attributes
     */
    public function update($id, $attributes = []);

    /**
     * Delete.
     */
    public function delete($id);
}
