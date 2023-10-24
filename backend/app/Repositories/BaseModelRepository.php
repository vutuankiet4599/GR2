<?php

namespace App\Repositories;

abstract class BaseModelRepository implements ModelRepositoryInterface
{
    protected $model;

    public function __construct()
    {
        $this->setModel();
    }

    public function __call($method, $args)
    {
        // Get all
        if (str_starts_with($method, 'getAll')) {
            return $this->handleGetAllWithRelationsAndConditions($method, [...$args]);
        }

        // Get with paginate
        if (str_starts_with($method, 'getPaginate')) {
            return $this->handleGetAllWithRelationsAndConditions($method, [...$args], true);
        }

        // Get one
        if (str_starts_with($method, 'getOne')) {
            return $this->handleGetOneWithRelationsAndConditions($method, [...$args]);
        }
    }

    private function separateCamelCaseToArrayLowercase($str)
    {
        preg_match_all('/((?:^|[A-Z])[a-z]+)/', $str, $matches);

        $lowercaseWords = array_map('strtolower', $matches[0]);

        return $lowercaseWords;
    }

    private function buildQuery($query, $condition, $isAnd, $isOr)
    {
        if ($isAnd) {
            return $query->where($condition[0], $condition[1], $condition[2]);
        }

        if ($isOr) {
            return $query->orWhere($condition[0], $condition[1], $condition[2]);
        }

        return $query;
    }

    private function clearCondition($paramIndex)
    {
        return [
            [],
            false,
            false,
            ++$paramIndex,
        ];
    }

    private function buildQueryAndClearCondition($query, $condition, $operator, $param, $currentParam, $isAnd, $isOr)
    {
        if ($operator == 'like') {
            array_push($condition, $operator, '%'.$param[$currentParam].'%');
        } else {
            array_push($condition, $operator, $param[$currentParam]);
        }
        $query = $this->buildQuery($query, $condition, $isAnd, $isOr);
        [$condition, $isAnd, $isOr, $currentParam] = $this->clearCondition($currentParam);

        return [$query, $condition, $isAnd, $isOr, $currentParam];
    }

    private function handleGetAllWithRelationsAndConditions($methodName, $param, $isPaginate = false)
    {
        $list = $this->separateCamelCaseToArrayLowercase($methodName);

        if ($list === false) {
            return [];
        }

        $step = 0;
        $count = 2;
        $query = $this->model;
        $relations = [];
        $isAnd = true;
        $isOr = false;

        for ($i = 1; $i < count($list); ++$i) {
            $count = $i;

            if (!strcmp($list[$i], 'with')) {
                $step = 1;
                continue;
            }

            if (!strcmp($list[$i], 'by')) {
                $step = 2;
                break;
            }

            if ($step == 1 && $list[$i] != 'and') {
                if ($list[$i+1] != 'and') {
                    $list[$i+1] = $list[$i].ucfirst($list[$i+1]);
                    ++$i;
                }
                array_push($relations, $list[$i]);
            }
        }

        $query = $query->with($relations);

        if ($step == 2) {
            $condition = [];
            $currentParam = 0;
            for ($i = $count + 1; $i < count($list); ++$i) {
                switch ($list[$i]) {
                    case 'ge':
                        [$query, $condition, $isAnd, $isOr, $currentParam] = $this->buildQueryAndClearCondition(
                            $query,
                            $condition,
                            '>=',
                            $param,
                            $currentParam,
                            $isAnd,
                            $isOr
                        );
                        break;

                    case 'le':
                        [$query, $condition, $isAnd, $isOr, $currentParam] = $this->buildQueryAndClearCondition(
                            $query,
                            $condition,
                            '<=',
                            $param,
                            $currentParam,
                            $isAnd,
                            $isOr
                        );
                        break;

                    case 'gt':
                        [$query, $condition, $isAnd, $isOr, $currentParam] = $this->buildQueryAndClearCondition(
                            $query,
                            $condition,
                            '>',
                            $param,
                            $currentParam,
                            $isAnd,
                            $isOr
                        );
                        break;

                    case 'lt':
                        [$query, $condition, $isAnd, $isOr, $currentParam] = $this->buildQueryAndClearCondition(
                            $query,
                            $condition,
                            '<',
                            $param,
                            $currentParam,
                            $isAnd,
                            $isOr
                        );
                        break;

                    case 'eq':
                        [$query, $condition, $isAnd, $isOr, $currentParam] = $this->buildQueryAndClearCondition(
                            $query,
                            $condition,
                            '=',
                            $param,
                            $currentParam,
                            $isAnd,
                            $isOr
                        );
                        break;

                    case 'ne':
                        [$query, $condition, $isAnd, $isOr, $currentParam] = $this->buildQueryAndClearCondition(
                            $query,
                            $condition,
                            '!=',
                            $param,
                            $currentParam,
                            $isAnd,
                            $isOr
                        );
                        break;

                    case 'like':
                        [$query, $condition, $isAnd, $isOr, $currentParam] = $this->buildQueryAndClearCondition(
                            $query,
                            $condition,
                            'like',
                            $param,
                            $currentParam,
                            $isAnd,
                            $isOr
                        );
                        break;

                    case 'and':
                        $isAnd = true;
                        $isOr = false;
                        break;

                    case 'or':
                        $isAnd = false;
                        $isOr = true;
                        break;

                    default:
                        if (str_ends_with($list[$i], 'id')) {
                            $list[$i] = substr_replace($list[$i], '_id', strlen($list[$i]) - 2);
                        }
                        if (str_starts_with($list[$i], 'is')) {
                            $list[$i] = 'is_'.str_replace('is', '', $list[$i]);
                        }
                        array_push($condition, $list[$i]);
                        break;
                }
            }
        }

        return $isPaginate ? $query->paginate(config('app.items_per_page')) : $query->get();
    }

    private function handleGetOneWithRelationsAndConditions($methodName, $param)
    {
        return $this->handleGetAllWithRelationsAndConditions($methodName, $param, false)[0];
    }

    abstract public function getModel();

    public function setModel()
    {
        $this->model = app()->make(
            $this->getModel()
        );
    }

    public function getAll()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        $result = $this->model->find($id);

        return $result;
    }

    public function create($attributes = [])
    {
        return $this->model->create($attributes);
    }

    public function update($id, $attributes = [])
    {
        $result = $this->find($id);
        if ($result) {
            $result->update($attributes);

            return $result;
        }

        return false;
    }

    public function delete($id)
    {
        $result = $this->find($id);
        if ($result) {
            $result->delete();

            return true;
        }

        return false;
    }
}
